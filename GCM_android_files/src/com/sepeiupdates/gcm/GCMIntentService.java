package com.sepeiupdates.gcm;

import java.util.Calendar;

import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.google.android.gcm.GCMBaseIntentService;

@SuppressLint("NewApi")
public class GCMIntentService extends GCMBaseIntentService {

	private static final String TAG = "GCMIntentService";
	
	private Controller aController = null;

    public GCMIntentService() {
    	// Call extended class Constructor GCMBaseIntentService
        super(Config.GOOGLE_SENDER_ID);
    }

    /**
     * Method called on device registered
     **/
    @Override
    protected void onRegistered(Context context, String registrationId) {
    	
    	//Get Global Controller Class object (see application tag in AndroidManifest.xml)
    	if(aController == null)
           aController = (Controller) getApplicationContext();
    	
        Log.i(TAG, "Device registered: regId = " + registrationId);
        aController.displayMessageOnScreen(context, Config.ISCONTROLLER);
        Log.d("NAME", MainActivity.name);
        aController.register(context, MainActivity.name, MainActivity.email, registrationId);
    }

    /**
     * Method called on device unregistred
     * */
    @Override
    protected void onUnregistered(Context context, String registrationId) {
    	if(aController == null)
            aController = (Controller) getApplicationContext();
        Log.i(TAG, "Device unregistered");
        aController.displayMessageOnScreen(context, Config.ISCONTROLLER_NOT_REGISTERED);
        aController.unregister(context, registrationId);
    }

    /**
     * Method called on Receiving a new message from GCM server
     * */
    @Override
    protected void onMessage(Context context, Intent intent) {
    	
    	if(aController == null)
            aController = (Controller) getApplicationContext();
    	
        Log.i(TAG, "Received message");
        String message = intent.getExtras().getString("price");
        
        aController.displayMessageOnScreen(context, message);
		//DB handling
		SQLiteDatabase messagesDB = openOrCreateDatabase("MessagesDB", Context.MODE_PRIVATE, null);
        
		if(MainActivity.isVisible == false) {
			//set 10 MB max size
			messagesDB.setMaximumSize(1000 * 1000);
			messagesDB.execSQL("CREATE TABLE IF NOT EXISTS messages(_id INTEGER PRIMARY KEY, Title VARCHAR,Body VARCHAR,TS VARCHAR,HLink VARCHAR, IsRead INT, Tag VARCHAR);");
			Log.d("#MyAppDebug", "3!");
			
			JSONObject obj = null;
			try {
				obj = new JSONObject(message);
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
	
			Log.d("#MyAppDebug", "onReceive JSON Obj->"+obj.toString());
			//update the DB
			try {
					Log.d("#MyAppDebug", "Inserting the msg now");
					messagesDB.beginTransactionNonExclusive();
					String timestamp = java.text.DateFormat.getDateTimeInstance().format(Calendar.getInstance().getTime());
					Log.d("#MyAppDebug", "INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+obj.getString("Title")+"','"+
							obj.getString("Body")+"','"+timestamp+"','"+obj.getString("Link")+"','"+"0"+"','"+obj.getString("Tag")+"');");
					messagesDB.execSQL("INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+obj.getString("Title")+"','"+
							obj.getString("Body")+"','"+timestamp+"','"+obj.getString("Link")+"','"+"0"+"','"+obj.getString("Tag")+"');");
					messagesDB.setTransactionSuccessful();
			} catch (SQLException e) {
				Log.d("#MyAppDebug", "JSON DB insertion ERROR 1");
				e.printStackTrace();
			} catch (JSONException e) {
				Log.d("#MyAppDebug", "JSON DB insertion ERROR 1");
				e.printStackTrace();
			}
			finally {
				messagesDB.endTransaction();
			}
		}			
        // notifies user
        try {
        	final Cursor curUnread;
    		curUnread=messagesDB.rawQuery("SELECT * FROM messages WHERE IsRead="+0+" ORDER BY _id", null);
			generateNotification(context, message, curUnread.getCount());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

    /**
     * Method called on receiving a deleted message
     * */
    @Override
    protected void onDeletedMessages(Context context, int total) {
    	
    	if(aController == null)
            aController = (Controller) getApplicationContext();
    	
        Log.i(TAG, "Received deleted messages notification");
        String message = getString(R.string.gcm_deleted, total);
        aController.displayMessageOnScreen(context, Config.ISCONTROLLER);
        // notifies user
        try {
			generateNotification(context, message, 0);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

    /**
     * Method called on Error
     * */
    @Override
    public void onError(Context context, String errorId) {
    	
    	if(aController == null)
            aController = (Controller) getApplicationContext();
    	
        Log.i(TAG, "Received error: " + errorId);
        //aController.displayMessageOnScreen(context, Config.ISCONTROLLER);//getString(R.string.gcm_error, errorId));
    }

    @Override
    protected boolean onRecoverableError(Context context, String errorId) {
    	
    	if(aController == null)
            aController = (Controller) getApplicationContext();
    	
        // log message
        Log.i(TAG, "Received recoverable error: " + errorId);
       // aController.displayMessageOnScreen(context, Config.ISCONTROLLER);//getString(R.string.gcm_recoverable_error,
                //errorId));
        return super.onRecoverableError(context, errorId);
    }

    /**
     * Create a notification to inform the user that server has sent a message.
     * @throws JSONException 
     */
    private static void generateNotification(Context context, String message, int count) throws JSONException {
        int icon = R.drawable.logo;
        long when = System.currentTimeMillis();

        JSONObject obj = null;
        try {

        	obj = new JSONObject(message);

        	Log.d("#MyAppDebug", "JSON Obj->"+obj.toString());


        	NotificationManager notificationManager = (NotificationManager)
        			context.getSystemService(Context.NOTIFICATION_SERVICE);
        	//Notification notification = new Notification(icon, message, when);
        	//String title = context.getString(R.string.app_name);

        	Intent notificationIntent = new Intent(context, MainActivity.class);
        	// set intent so it does not start a new activity
        	notificationIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP |
        			Intent.FLAG_ACTIVITY_SINGLE_TOP);
        	PendingIntent intent =
        			PendingIntent.getActivity(context, 0, notificationIntent, 0);
        	//notification.setLatestEventInfo(context, title, message, intent);
        	
            String Title = "PEI Updates";
            String Body = obj.getString("Title");

            if(count > 1) {
            	Body = count+" Unread Messages";
            }
            
        	Notification notification = new Notification.Builder(context).setSmallIcon(icon)
        			.setContentTitle(Title)
        			.setContentText(Body)
        			.setWhen(when)
        			.setContentIntent(intent)
        			.build();

        	notification.flags |= Notification.FLAG_AUTO_CANCEL;

        	// Play default notification sound
        	notification.defaults |= Notification.DEFAULT_SOUND;

        	//notification.sound = Uri.parse("android.resource://" + context.getPackageName() + "your_sound_file_name.mp3");

        	// Vibrate if vibrate is enabled
        	notification.defaults |= Notification.DEFAULT_VIBRATE;
        	notificationManager.notify(0, notification);

        } catch (Throwable t) {
        	Log.d("#MyAppDebug", "Could not parse malformed JSON: \"" + message + "\"");
        }
    }

}

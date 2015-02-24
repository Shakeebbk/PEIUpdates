package com.androidexample.gcm;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.fortysevendeg.swipelistview.BaseSwipeListViewListener;
import com.fortysevendeg.swipelistview.SwipeListView;
import com.google.android.gcm.GCMRegistrar;

class asyncParamClass {
	Context context;
	String regId;
	
	asyncParamClass(Context context, String regId) {
		this.context = context;
		this.regId = regId;
	}
};

public class MainActivity extends Activity {
	// label to display gcm messages
	TextView lblMessage;
	Controller aController;
	
	// Asyntask
	class RegisterTask extends AsyncTask<asyncParamClass, Void, Void> {

		@Override
		protected Void doInBackground(asyncParamClass... param) {
			
			// Register on our server
			// On server creates a new user
			Log.d("#MyAppDebug", "#13->"+ param[0].regId);
			//Toast.makeText(getApplicationContext(),"#MyAppDebug"+"#13 "+regId, Toast.LENGTH_LONG).show();
			aController.register(param[0].context, name, email, param[0].regId);
			
				this.cancel(true);
			
			return null;
		}

	};
	//AsyncTask<Void, Void, Void> mRegisterTask;
	RegisterTask mRegisterTask = new RegisterTask();
	
	public static String name;
	public static String email;

	SQLiteDatabase messagesDB;
	
	SwipeListView lvItems = null;
	private messageAdapter adapter=null;

    final List<messageClass> messages=new ArrayList<messageClass>();
	
	@Override
	public void onCreate(Bundle savedInstanceState) { 
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		Log.d("#MyAppDebug", "1!");
		//Get Global Controller Class object (see application tag in AndroidManifest.xml)
		aController = (Controller) getApplicationContext();
		
		// Check if Internet present
		if (!aController.isConnectingToInternet()) {
			
			// Internet Connection is not present
			aController.showAlertDialog(MainActivity.this,
					"Internet Connection Error",
					"Please connect to Internet connection", false);
			// stop executing code by return
			return;
		}
		
		lvItems = (SwipeListView) findViewById(R.id.swipe_lv_list);
		//DB handling
		messagesDB = openOrCreateDatabase("MessagesDB", Context.MODE_PRIVATE, null);
		//set 10 MB max size
		messagesDB.setMaximumSize(1000 * 1000);
		messagesDB.execSQL("CREATE TABLE IF NOT EXISTS messages(Title VARCHAR,Body VARCHAR,TS LONG,HLink VARCHAR);");
		Log.d("#MyAppDebug", "3!");
		// Retrieving all records
        final Cursor c=messagesDB.rawQuery("SELECT * FROM messages", null);
        
        if(c.getCount() == 0) {
        	Log.d("#MyAppDebug", "fromDB - No Etries in DB!");
        }
        
        for(int n=0; (n<20) &&(c.moveToNext());n++) {
        	String dateString=null;
    		int timestamp = c.getInt(2);
    		DateFormat[] formats = new DateFormat[] {
    				DateFormat.getDateTimeInstance(),
    		};
    		for (DateFormat df : formats) {
    			dateString = df.format(new Date(timestamp));
    		}
        	Log.d("#MyAppDebug", "fromDB - c.getString(1) "+c.getString(0));
        	messages.add(new messageClass(c.getString(0), c.getString(1), dateString, "Link"));
        }
        adapter = new messageAdapter(this, messages);
        
        lvItems.setAdapter(adapter);
        
     // Attach the listener to the AdapterView onCreate
        lvItems.setOnScrollListener(new EndlessScrollListener(5) {
        	// Append more data into the adapter
        	public void customLoadMoreDataFromApi(int offset) {
        		// This method probably sends out a network request and appends new data items to your adapter. 
        		// Use the offset value and add it as a parameter to your API request to retrieve paginated data.
        		// Deserialize API response and then construct new objects to append to the adapter
        		Log.d("#MyAppDebug", "customLoadMoreDataFromApi - offset "+ offset);
        		// Retrieving all records
                final Cursor cur=messagesDB.rawQuery("SELECT * FROM messages", null);
                Boolean isScrollable = cur.moveToPosition(offset*20);
                Log.d("#MyAppDebug", "fromDB - cur.getCount() "+cur.getCount()+"cur.moveToPosition(offset*20) "+isScrollable);
        		if((cur.getCount() == 0) || (false == isScrollable)) {
                	Log.d("#MyAppDebug", "fromDB - No Etries in DB!");
                }
        		for(int n=0 ; (n<20) &&(cur.moveToNext());n++) {
                	Log.d("#MyAppDebug", "fromDB - cur.getString(1) "+cur.getString(0));
                	String dateString=null;
            		int timestamp = cur.getInt(2);
    				DateFormat[] formats = new DateFormat[] {
    						DateFormat.getDateTimeInstance(),
    				};
    				for (DateFormat df : formats) {
    					dateString = df.format(new Date(timestamp));
    				}
                	messages.add(new messageClass(cur.getString(0), cur.getString(1), dateString, "Link"));
                }
        	}
        	@Override
        	public void onLoadMore(int page, int totalItemsCount) {
        		// Triggered only when new data needs to be appended to the list
        		// Add whatever code is needed to append new items to your AdapterView
        		Log.d("#MyAppDebug", "onLoadMore - page "+page+"totalItemsCount "+totalItemsCount);
        		customLoadMoreDataFromApi(page); 
        		// or customLoadMoreDataFromApi(totalItemsCount); 
        	}
        });
        
        //set on swipe listener
        lvItems.setSwipeListViewListener(new BaseSwipeListViewListener() {
            @Override
            public void onOpened(int position, boolean toRight) {
            }
    
            @Override
            public void onClosed(int position, boolean fromRight) {
            }
    
            @Override
            public void onListChanged() {
            }
    
            @Override
            public void onMove(int position, float x) {
            }
    
            @Override
            public void onStartOpen(int position, int action, boolean right) {
                Log.d("#MyAppDebug", String.format("swipe onStartOpen %d - action %d", position, action));
            }
    
            @Override
            public void onStartClose(int position, boolean right) {
                Log.d("#MyAppDebug", String.format("swipe onStartClose %d", position));
            }
    
            @Override
            public void onClickFrontView(int position) {
                Log.d("#MyAppDebug", String.format("swipe onClickFrontView %d", position));
    
                lvItems.openAnimate(position); //when you touch front view it will open
    
            }
    
            @Override
            public void onClickBackView(int position) {
                Log.d("#MyAppDebug", String.format("swipe onClickBackView %d", position));
    
                lvItems.closeAnimate(position);//when you touch back view it will close
            }
    
            @Override
            public void onDismiss(int[] reverseSortedPositions) {
    
            }
    
        });
		//on click of edit registration
		final Button editReg = (Button)findViewById(R.id.editReg);
		
		editReg.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// Unregister Broadcast Receiver
				unregisterReceiver(mHandleMessageReceiver);
				
				//Clear internal resources.
				GCMRegistrar.onDestroy(getApplicationContext());
				
				// Launch Register Activity
				Intent i = new Intent(getApplicationContext(), RegisterActivity.class);
				i.putExtra("isIntent", true);
				startActivity(i);
				finish();
			}
		});
		
		// Getting name, email from intent
		Intent i = getIntent();
		
		name = i.getStringExtra("name");
		email = i.getStringExtra("email");		
		
		// Make sure the device has the proper dependencies.
		GCMRegistrar.checkDevice(this);

		// Make sure the manifest permissions was properly set 
		GCMRegistrar.checkManifest(this);

		lblMessage = (TextView) findViewById(R.id.lblMessage);
		
		// Register custom Broadcast receiver to show messages on activity
		registerReceiver(mHandleMessageReceiver, new IntentFilter(
				Config.DISPLAY_MESSAGE_ACTION));

		// Get GCM registration id
		final String regId = GCMRegistrar.getRegistrationId(this);
		Log.d("#MyAppDebug", "MainActivity - regId1 "+regId);
		// Check if regid already presents
		if (regId.equals("")) {
			Log.d("#MyAppDebug", "MainActivity - regId2 "+regId);
			// Register with GCM			
			GCMRegistrar.register(this, Config.GOOGLE_SENDER_ID);
			
		} else {
			Log.d("#MyAppDebug", "MainActivity - regId3 "+regId);
			//Toast.makeText(getApplicationContext(),"#MyAppDebug"+"#11 "+regId, Toast.LENGTH_LONG).show();
			// Device is already registered on GCM Server
			if (GCMRegistrar.isRegisteredOnServer(this)) {
				Log.d("#MyAppDebug", "MainActivity(isRegisteredOnServer) - regId "+regId);
				//Toast.makeText(getApplicationContext(),"#MyAppDebug"+"#12 "+regId, Toast.LENGTH_LONG).show();
				// Skips registration.				
				Toast.makeText(getApplicationContext(), "Already registered with GCM Server", Toast.LENGTH_LONG).show();
			
			} else {
				
				// Try to register again, but not in the UI thread.
				// It's also necessary to cancel the thread onDestroy(),
				// hence the use of AsyncTask instead of a raw thread.
				//final Context context = this;
				
				// execute AsyncTask
				asyncParamClass asyncParam = new asyncParamClass(this, regId);
				mRegisterTask.execute(asyncParam, null, null);
			}
		}
	}

	// Create a broadcast receiver to get message and show on screen 
	private final BroadcastReceiver mHandleMessageReceiver = new BroadcastReceiver() {
		
		@SuppressLint("NewApi")
		@Override
		public void onReceive(Context context, Intent intent) {
			
			String newMessage = intent.getExtras().getString(Config.EXTRA_MESSAGE);

			// Waking up mobile if it is sleeping
			aController.acquireWakeLock(getApplicationContext());

			JSONObject obj = null;
			try {

				obj = new JSONObject(newMessage);

				Log.d("#MyAppDebug", "JSON Obj->"+obj.toString());

				//update list view
				//adapter.clear();
				//update the DB
				try {					
					messagesDB.beginTransactionNonExclusive();

					java.util.Date timestamp = new Date(System.currentTimeMillis());
					messagesDB.execSQL("INSERT INTO messages VALUES('"+obj.getString("Title")+"','"+
							obj.getString("Body")+"','"+timestamp.getTime()+"','"+"Dummy"+"');");
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
				messages.clear();
				// Retrieving all records
				final Cursor curNew=messagesDB.rawQuery("SELECT * FROM messages", null);
				if(curNew.getCount() == 0) {
					Log.d("#MyAppDebug", "fromDB - No Etries in DB!");
				}
				String dateString=null;
				for(int n=0; (n<20) &&(curNew.moveToNext());n++) {	
					int timestamp = curNew.getInt(2);
					DateFormat[] formats = new DateFormat[] {
							DateFormat.getDateTimeInstance(),
					};
					for (DateFormat df : formats) {
						dateString = df.format(new Date(timestamp));
					}

					Log.d("#MyAppDebug", "BroadcastReceiver fromDB - dateString "+dateString+"curNew.getCount() "+curNew.getCount());
					messages.add(new messageClass(curNew.getString(0), curNew.getString(1), dateString, "Link"));
				}
				adapter.notifyDataSetChanged();

			} catch (Throwable t) {
				Log.d("#MyAppDebug", "Could not parse malformed JSON: \"" + newMessage + "\"");
			}
			// Display message on the screen
			//lblMessage.append(newMessage + "\n");			
			
			Toast.makeText(getApplicationContext(), "Got Message: " + newMessage, Toast.LENGTH_LONG).show();

			// Releasing wake lock
			aController.releaseWakeLock();
		}
	};
	
	@Override
	protected void onDestroy() {
		try {
			// Unregister Broadcast Receiver
			unregisterReceiver(mHandleMessageReceiver);
			
			//Clear internal resources.
			GCMRegistrar.onDestroy(this);
			
		} catch (Exception e) {
			Log.e("UnRegister Receiver Error", "> " + e.getMessage());
		}
		super.onDestroy();
	}
}

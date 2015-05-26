package com.sepeiupdates.gcm;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.app.ActionBar;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.Window;
import android.widget.TextView;
import com.fortysevendeg.swipelistview.BaseSwipeListViewListener;
import com.fortysevendeg.swipelistview.SwipeListView;
import com.google.android.gcm.GCMRegistrar;
import com.sepeiupdates.gcm.Config.ConnectionStatus;

class asyncParamClass {
	Context context;
	String regId;
	
	asyncParamClass(Context context, String regId) {
		this.context = context;
		this.regId = regId;
	}
};

@SuppressLint("NewApi")
public class MainActivity extends Activity {
	// label to display gcm messages
	TextView lblMessage;
	Controller aController;
	
	boolean isFilterRead = false;

	private boolean scrollingUp=false;
	
	public static boolean isActionBarShown=true;
	
	public static ConnectionStatus conStatus = ConnectionStatus.CONNECTION_ERROR;
	
	public boolean isScrollingUp() {
		if(scrollingUp) {
			return true;
		}
		else {
			return false;
		}
	}
	
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
	public static String regId;
	
	public static boolean showConn;
	public static boolean isVisible = false;
	
	SQLiteDatabase messagesDB;
	
	SwipeListView lvItems = null;
	private messageAdapter adapter=null;
	
	ActionBar actionBar=null;

    final List<messageClass> messages=new ArrayList<messageClass>();
    
    Boolean isSwipeLeft = false;
	
    ViewPager mPager;
	protected boolean isListChanged=false;
    
	@Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.activity_main_actions, menu);
        
        return super.onCreateOptionsMenu(menu);
    }
	
	@Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Take appropriate action for each action item click
        switch (item.getItemId()) {
        case R.id.action_deleteDB:
			Log.d("#MyAppDebug", String.format("OnClickListener clearDB"));
			//delete the entry and notify adapter change
			messagesDB.execSQL("DELETE FROM messages");
			clearUpdateAdapter();
			return true;
        case R.id.action_edit_prefs:
        	// Unregister Broadcast Receiver
			unregisterReceiver(mHandleMessageReceiver);
			
			GCMRegistrar.setRegisteredOnServer(getBaseContext(), false);
			
			//Clear internal resources.
			GCMRegistrar.onDestroy(getApplicationContext());
			
			// Launch Register Activity
			Intent i = new Intent(getApplicationContext(), RegisterActivity.class);
			i.putExtra("isIntent", true);
			startActivity(i);
			finish();
            return true;
        case R.id.action_filterDB:
        	Log.d("#MyAppDebug", String.format("isFilterRead true"));
        	if(isFilterRead == false) {
        		item.setIcon(R.drawable.ic_action_filter_unread);
        	}
        	else {
        		item.setIcon(R.drawable.ic_action_filter_all);
        	}
        	isFilterRead = !isFilterRead;
        	clearUpdateAdapter();
        	return true;
        default:
            return super.onOptionsItemSelected(item);
        }
	}
	@Override
	protected void onStop() {
		// TODO Auto-generated method stub
		Log.d("#MyAppDebugAPPState", "onStop isFilterRead"+isFilterRead);
		super.onStop();
	}
	@Override
	protected void onRestart() {
		// TODO Auto-generated method stub
		super.onRestart();
		Log.d("#MyAppDebugAPPState", "onRestart");
	}
	@Override
	protected void onPause() {
		// TODO Auto-generated method stub
		super.onPause();
		isVisible = false;
		mRegisterTask.cancel(true);
		try {
			// Unregister Broadcast Receiver
			unregisterReceiver(mHandleMessageReceiver);
			
			//Clear internal resources.
			GCMRegistrar.onDestroy(this);
			
		} catch (Exception e) {
			Log.e("UnRegister Receiver Error", "> " + e.getMessage());
		}
		Log.d("#MyAppDebugAPPState", "onPause");
	}
	@Override
	protected void onResume() {
		// TODO Auto-generated method stub
		super.onResume();
		Log.d("#MyAppDebugAPPState", "onResume");
		
		isVisible = true;
		
		aController = (Controller) getApplicationContext();
		// Check if Internet present
		if (!aController.isConnectingToInternet()) {
					// Internet Connection is not present
					//aController.showAlertDialog(MainActivity.this,
					//		"Internet Connection Error",
					//		"Please connect to Internet connection", false);
					conStatus = ConnectionStatus.CONNECTION_ERROR;
					getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_logo_no_connection));
					// stop executing code by return
					//return;
		}
		else {
			getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_logo));
		}
		
		if((MainActivity.conStatus == ConnectionStatus.REGSITER_ERROR) || (MainActivity.conStatus == ConnectionStatus.REGISTER_E_END)) {
			getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_logo_no_registration));
		}
		mRegisterTask = new RegisterTask();
		
		// Make sure the device has the proper dependencies.
		GCMRegistrar.checkDevice(this);

		// Make sure the manifest permissions was properly set 
		GCMRegistrar.checkManifest(this);
		
		// Register custom Broadcast receiver to show messages on activity
		registerReceiver(mHandleMessageReceiver, new IntentFilter(
				Config.DISPLAY_MESSAGE_ACTION));
		
		// Get GCM registration id
		regId = GCMRegistrar.getRegistrationId(this);
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
				//Toast.makeText(getApplicationContext(), "Already registered with GCM Server", Toast.LENGTH_LONG).show();
			
			} else {
				
				// Try to register again, but not in the UI thread.
				// It's also necessary to cancel the thread onDestroy(),
				// hence the use of AsyncTask instead of a raw thread.
				//final Context context = this;
				
				// execute AsyncTask
				asyncParamClass asyncParam = new asyncParamClass(this, regId);
				mRegisterTask.execute(asyncParam, null, null);
				getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_logo_no_registration));
				
			}
		}
		clearUpdateAdapter();
	}
	@SuppressLint("CutPasteId")
	@Override
	public void onCreate(Bundle savedInstanceState) { 
		super.onCreate(savedInstanceState);
		getWindow().requestFeature(Window.FEATURE_ACTION_BAR_OVERLAY);
		setContentView(R.layout.activity_main);

		isVisible = true;
		
		Log.d("#MyAppDebugAPPState", "onCreate");
		Log.d("#MyAppDebug", "1!");

		getActionBar().setDisplayShowTitleEnabled(false);
		getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_logo));
		
		Log.d("#MyAppDebug", "isFilterRead "+isFilterRead);
		//Get Global Controller Class object (see application tag in AndroidManifest.xml)
		aController = (Controller) getApplicationContext();

		lvItems = (SwipeListView) findViewById(R.id.swipe_lv_list);
		
		// Check if Internet present
		if (!aController.isConnectingToInternet()) {
			
			// Internet Connection is not present
			//aController.showAlertDialog(MainActivity.this,
			//		"Internet Connection Error",
			//		"Please connect to Internet connection", false);
			conStatus = ConnectionStatus.CONNECTION_ERROR;
			getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_logo_no_connection));
			// stop executing code by return
			//return;
		}
		
		//DB handling
		messagesDB = openOrCreateDatabase("MessagesDB", Context.MODE_PRIVATE, null);
		//set 10 MB max size
		messagesDB.setMaximumSize(1000 * 1000);
		messagesDB.execSQL("CREATE TABLE IF NOT EXISTS messages(_id INTEGER PRIMARY KEY, Title VARCHAR,Body VARCHAR,TS VARCHAR,HLink VARCHAR, IsRead INT, Tag VARCHAR);");
		Log.d("#MyAppDebug", "3!");
		
		
		//Debug
		/*
		String curDate = java.text.DateFormat.getDateTimeInstance().format(Calendar.getInstance().getTime());
		messagesDB.execSQL("DELETE FROM messages");
		messagesDB.execSQL("INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+"Title12345566666666613fgzdfaklmsdkgj"+"','"+
				"Body1 has been made long please take casre while updating it in the message, CONGRATS!! Hurray,,,,,,,,,, explempfary stupendous growth opportunity###$$$$"+"',"+"'"+curDate+"'"+",'"+"http://www.google.com'"+","+0+",'M');");
		messagesDB.execSQL("INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+"T2"+"','"+
				"Body1 has been made long please take casre while updating it in the message, CONGRATS!! Hurray,,,,,,,,,, explempfary stupendous growth opportunity###$$$$"+"',"+"'"+curDate+"'"+",'"+"http://www.google.com'"+","+0+",'M');");
		messagesDB.execSQL("INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+"3"+"','"+
				"Body1 has been made long please take casre while updating it in the message, CONGRATS!! Hurray,,,,,,,,,, explempfary stupendous growth opportunity###$$$$"+"',"+"'"+curDate+"'"+",'"+"http://www.google.com'"+","+0+",'M');");
		messagesDB.execSQL("INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+"4"+"','"+
				"Body1 has been made long please take casre while updating it in the message, CONGRATS!! Hurray,,,,,,,,,, explempfary stupendous growth opportunity###$$$$"+"',"+"'"+curDate+"'"+",'"+"http://www.google.com'"+","+0+",'M');");
		messagesDB.execSQL("INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+"5"+"','"+
				"Body1 has been made long please take casre while updating it in the message, CONGRATS!! Hurray,,,,,,,,,, explempfary stupendous growth opportunity###$$$$"+"',"+"'"+curDate+"'"+",'"+"http://www.google.com'"+","+0+",'M');");
		messagesDB.execSQL("INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+"6"+"','"+
				"Body1 has been made long please take casre while updating it in the message, CONGRATS!! Hurray,,,,,,,,,, explempfary stupendous growth opportunity###$$$$"+"',"+"'"+curDate+"'"+",'"+"http://www.google.com'"+","+0+",'M');");
		messagesDB.execSQL("INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+"7"+"','"+
				"Body1 has been made long please take casre while updating it in the message, CONGRATS!! Hurray,,,,,,,,,, explempfary stupendous growth opportunity###$$$$"+"',"+"'"+curDate+"'"+",'"+"http://www.google.com'"+","+0+",'M');");
		messagesDB.execSQL("INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+"8"+"','"+
				"Body1 has been made long please take casre while updating it in the message, CONGRATS!! Hurray,,,,,,,,,, explempfary stupendous growth opportunity###$$$$"+"',"+"'"+curDate+"'"+",'"+"http://www.google.com'"+","+0+",'M');");
		messagesDB.execSQL("INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+"9"+"','"+
				"Body1 has been made long please take casre while updating it in the message, CONGRATS!! Hurray,,,,,,,,,, explempfary stupendous growth opportunity###$$$$"+"',"+"'"+curDate+"'"+",'"+"http://www.google.com'"+","+0+",'M');");
		messagesDB.execSQL("INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+"10"+"','"+
				"Body1 has been made long please take casre while updating it in the message, CONGRATS!! Hurray,,,,,,,,,, explempfary stupendous growth opportunity###$$$$"+"',"+"'"+curDate+"'"+",'"+"http://www.google.com'"+","+0+",'M');");
		messagesDB.execSQL("INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+"11"+"','"+
				"Body1 has been made long please take casre while updating it in the message, CONGRATS!! Hurray,,,,,,,,,, explempfary stupendous growth opportunity###$$$$"+"',"+"'"+curDate+"'"+",'"+"http://www.google.com'"+","+0+",'M');");
		*/
		final Cursor c;
        // Retrieving all records
		c=messagesDB.rawQuery("SELECT * FROM messages ORDER BY _id DESC", null);
        
        if(c.getCount() == 0){
        	Log.d("#MyAppDebug", "fromDB - No Etries in DB!");
        }
        
        while(c.moveToNext()) {
        	String timestamp = c.getString(3);

        	Log.d("#MyAppDebug", "fromDB - c.getString(1) "+c.getString(0)+"flag IsRead"+c.getString(5)+"Tag-"+c.getString(6));
        	messages.add(new messageClass(c.getInt(0), c.getString(1), c.getString(2), timestamp, c.getString(4), c.getInt(5), c.getString(6)));
        }
        adapter = new messageAdapter(this, messages);
        
        lvItems.setAdapter(adapter);
        
        /*
        //scroll listener
        lvItems.setOnScrollListener(new SwipeListView.OnScrollListener() {
			
			@Override
			public void onScrollStateChanged(AbsListView arg0, int arg1) {
				// TODO Auto-generated method stub
				Log.d("#MyAppDebug Connhide", "onScrollStateChanged "+arg1);

			}
			
			@Override
			public void onScroll(AbsListView arg0, int arg1, int arg2, int arg3) {
				// TODO Auto-generated method stub

			    if (arg0.getId() == lvItems.getId()) {
			        final int currentFirstVisibleItem = lvItems.getFirstVisiblePosition();

			        if (currentFirstVisibleItem > mLastFirstVisibleItem) {
			        	//scroll down, bring up the action bar
			        	//getActionBar().hide();
			        	scrollingUp = true;
			        } else if (currentFirstVisibleItem < mLastFirstVisibleItem) {
			        	//scroll up, bring back the action bar
			        	//getActionBar().show();
			        	scrollingUp = false;
			        }

			        if((currentFirstVisibleItem == (mLastFirstVisibleItem+1)) ||
			        		(currentFirstVisibleItem == (mLastFirstVisibleItem-1))) {
			        	mLastFirstVisibleItem = currentFirstVisibleItem;
			        }
			    }				
			}
		});*/
   /*     
     // Attach the listener to the AdapterView onCreate
        lvItems.setOnScrollListener(new EndlessScrollListener(5) {
        	// Append more data into the adapter
        	public void customLoadMoreDataFromApi(int offset) {
        		// This method probably sends out a network request and appends new data items to your adapter. 
        		// Use the offset value and add it as a parameter to your API request to retrieve paginated data.
        		// Deserialize API response and then construct new objects to append to the adapter
        		Log.d("#MyAppDebug", "customLoadMoreDataFromApi - offset "+ offset);
        		// Retrieving all records
                final Cursor cur=messagesDB.rawQuery("SELECT * FROM messages ORDER BY _id DESC", null);
                if(offset==0) {
                	messages.clear();
                }
                Boolean isScrollable = cur.moveToPosition(offset*5);
                Log.d("#MyAppDebug", "fromDB - cur.getCount() "+cur.getCount()+"cur.moveToPosition(offset*20) "+isScrollable);
        		if((cur.getCount() == 0) || (false == isScrollable)) {
                	Log.d("#MyAppDebug", "fromDB - No Etries in DB!");
                }
        		for(int n=0 ; (n<5) &&(cur.moveToNext());n++) {
                	Log.d("#MyAppDebug", "fromDB - cur.getString(1) "+cur.getString(0));
                	int timestamp = cur.getInt(2);

                	messages.add(new messageClass(cur.getInt(0), cur.getString(1), cur.getString(2), timestamp, "Link"));
                }
        	}
        	
        	@Override
        	public void onScrollUp() {
        		super.onScrollUp();
				getActionBar().show();
        	}
        	@Override
        	public void onScrollDown() {
        		super.onScrollDown();
				getActionBar().hide();
        	}
        	@Override
        	public void onLoadMore(int page, int totalItemsCount) {
        		// Triggered only when new data needs to be appended to the list
        		// Add whatever code is needed to append new items to your AdapterView
        		Log.d("#MyAppDebug", "onLoadMore - page "+page+"totalItemsCount "+totalItemsCount);

        		customLoadMoreDataFromApi(page);
        		// or customLoadMoreDataFromApi(totalItemsCount);
        	}
        });*/
        
        //set on swipe listener
        lvItems.setSwipeListViewListener(new BaseSwipeListViewListener() {
            @Override
            public void onOpened(int position, boolean toRight) {
            	isSwipeLeft = false;
            }
    
            @Override
            public void onClosed(int position, boolean fromRight) {
            	isSwipeLeft = false;
            }
    
            @Override
            public void onListChanged() {
            	Log.d("#MyAppDebug", String.format("swipe onListChanged"));
            }
    
            @Override
            public void onMove(int position, float x) {
            	Log.d("#MyAppDebug", String.format("swipe onStartOpen move "+x+"position "+position+" isListChanged "+isListChanged));
            	if(messages.isEmpty()) {
            		isSwipeLeft=false;
            	}
            	if(isSwipeLeft) {
            		if(x<-300) {
                    	//lvItems.openAnimate(position);
            		}
            	}
            }
    
            @Override
            public void onStartOpen(int position, int action, boolean right) {
                Log.d("#MyAppDebug", String.format("swipe onStartOpen %d - action %d", position, action));
                isSwipeLeft = true;
            }
    
            @Override
            public void onStartClose(int position, boolean right) {
                Log.d("#MyAppDebug", String.format("swipe onStartClose %d", position));
                isSwipeLeft = false;
            }
    
            @Override
            public void onClickFrontView(int position) {
                Log.d("#MyAppDebug", String.format("swipe onClickFrontView %d", position));
                messagesDB.execSQL("UPDATE messages SET IsRead='1' WHERE _id="+(messages.get(position).Id));
             // Launch WebView Activity
				Intent i = new Intent(getApplicationContext(), PEIWebViewActivity.class);
				i.putExtra("regId",regId );
				i.putExtra("URL", messages.get(position).Link);
				startActivity(i);
				//finish();
            }
    
            @Override
            public void onClickBackView(int position) {
                Log.d("#MyAppDebug", String.format("swipe onClickBackView %d", position));
                lvItems.closeAnimate(position);
            }
    
            public void delButtonClick(int position) {
            	Log.d("#MyAppDebug", String.format("swipe onClickDeletebutton %d", position));
    			//delete the entry and notify adapter change
    			messagesDB.execSQL("DELETE FROM messages WHERE _id="+(messages.get(position).Id));
    			lvItems.closeAnimate(position);
    			clearUpdateAdapter();
            	
            }
            
            public void markReadClick(int position) {
            	Log.d("#MyAppDebug", String.format("swipe markReadClick %d", position));
            	messagesDB.execSQL("UPDATE messages SET IsRead='1' WHERE _id="+(messages.get(position).Id));
            	lvItems.closeAnimate(position);
    			clearUpdateAdapter();
            	
            }
            @Override
            public void onDismiss(int[] reverseSortedPositions) {
    
            }
            
            @Override
            public void setScrollingUp(boolean isUP) {
            	scrollingUp = isUP;
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
		
		// Register custom Broadcast receiver to show messages on activity
		registerReceiver(mHandleMessageReceiver, new IntentFilter(
				Config.DISPLAY_MESSAGE_ACTION));

		// Get GCM registration id
		regId = GCMRegistrar.getRegistrationId(this);
		Log.d("#MyAppDebug Register", "MainActivity - regId1 "+regId);
		// Check if regid already presents
		if (regId.equals("")) {
			Log.d("#MyAppDebug Register", "MainActivity - regId2 "+regId);
			// Register with GCM			
			GCMRegistrar.register(this, Config.GOOGLE_SENDER_ID);
			
		} else {
			Log.d("#MyAppDebug Register", "MainActivity - regId3 "+regId);
			//Toast.makeText(getApplicationContext(),"#MyAppDebug"+"#11 "+regId, Toast.LENGTH_LONG).show();
			// Device is already registered on GCM Server
			if (GCMRegistrar.isRegisteredOnServer(this)) {
				Log.d("#MyAppDebug Register", "MainActivity(isRegisteredOnServer) - regId "+regId);
				//Toast.makeText(getApplicationContext(),"#MyAppDebug"+"#12 "+regId, Toast.LENGTH_LONG).show();
				// Skips registration.				
				//Toast.makeText(getApplicationContext(), "Already registered with GCM Server", Toast.LENGTH_LONG).show();
			
			} else {
				
				// Try to register again, but not in the UI thread.
				// It's also necessary to cancel the thread onDestroy(),
				// hence the use of AsyncTask instead of a raw thread.
				//final Context context = this;
				
				// execute AsyncTask
				asyncParamClass asyncParam = new asyncParamClass(this, regId);
				mRegisterTask.execute(asyncParam, null, null);
				getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_logo_no_registration));

			}
		}
	}
	
	public void clearUpdateAdapter() {
		messages.clear();
		adapter.clear();
		final Cursor curNew;
		Log.d("#MyAppDebug", "clearUpdateAdapter() isFilterRead - "+isFilterRead);
		if(isFilterRead == true) {
			// Retrieving filtered records
			curNew=messagesDB.rawQuery("SELECT * FROM messages WHERE IsRead="+0+" ORDER BY _id DESC", null);
		}
		else {
			// Retrieving all records
			curNew=messagesDB.rawQuery("SELECT * FROM messages ORDER BY _id DESC", null);
		}
		Log.d("#MyAppDebug", "clearUpdateAdapter() curNew.getCount()"+curNew.getCount());
		if(curNew.getCount() == 0) {
			Log.d("#MyAppDebug", "clearUpdateAdapter() fromDB - No Etries in DB!");
		}

		for(int n=0; curNew.moveToNext();n++) {	
			String timestamp = curNew.getString(3);

			messages.add(new messageClass(curNew.getInt(0), curNew.getString(1), curNew.getString(2), timestamp, curNew.getString(4), curNew.getInt(5), curNew.getString(6)));
			Log.d("#MyAppDebug", "clearUpdateAdapter() fromDB - "+curNew.getInt(0)+curNew.getString(1)+curNew.getString(2)+timestamp+curNew.getString(4)+curNew.getInt(5)+curNew.getString(6));
			Log.d("#MyAppDebug", "clearUpdateAdapter() fromAdapter - "+messages.get(n).Id+messages.get(n).Title+messages.get(n).Body+messages.get(n).TimeStamp+messages.get(n).Link+messages.get(n).IsRead+messages.get(n).tag);
		}
		adapter.notifyDataSetChanged();
	}

	// Create a broadcast receiver to get message and show on screen 
	private final BroadcastReceiver mHandleMessageReceiver = new BroadcastReceiver() {
		
		@SuppressLint("NewApi")
		@Override
		public void onReceive(Context context, Intent intent) {
			
			String newMessage = intent.getExtras().getString(Config.EXTRA_MESSAGE);

			if(newMessage == null) return;
			if(newMessage.isEmpty()) return;
				
			// Waking up mobile if it is sleeping
			aController.acquireWakeLock(getApplicationContext());
			
			Log.d("#MyAppDebug onReceive", "onReceive MainActivity "+newMessage);
			if(newMessage.equals(Config.ISCONTROLLER)) {
				//registration done
				Log.d("#MyAppDebug onReceive", "onReceive MainActivity Config.ISCONTROLLER");
				getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_logo));
			}
			else if(newMessage.equals(Config.ISCONTROLLER_NOT_REGISTERED)) {
				//registration done
				Log.d("#MyAppDebug onReceive", "onReceive MainActivity Config.ISCONTROLLER_NOT_REGISTERED");
				getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_logo_no_registration));
			}
			else if(newMessage.equals(Config.ISINTERNET_CHANGE)) {
				//registration done
				Log.d("#MyAppDebug onReceive", "onReceive MainActivity Config.ISINTERNET_CHANGE");
				ConnectivityManager connectivityManager 
		        = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
				NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
				
				getActionBar().setDisplayShowTitleEnabled(false);
				getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_logo));

				if((activeNetworkInfo != null && activeNetworkInfo.isConnected()) == false) {
					getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_logo_no_connection));
				}
			}
			else {
				Log.d("#MyAppDebug onReceive", "onReceive MainActivity not a Config.ISCONTROLLER");
				if(isVisible == true) {
					JSONObject obj = null;
					try {
						obj = new JSONObject(newMessage);
					} catch (JSONException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
	
					//update the DB
					try {
						Log.d("#MyAppDebug MainActivity", "onReceive MainActivity JSON Obj->"+obj.toString());
							Log.d("#MyAppDebug MainActivity", "Inserting the msg now");
							messagesDB.beginTransactionNonExclusive();
							String timestamp = java.text.DateFormat.getDateTimeInstance().format(Calendar.getInstance().getTime());
							Log.d("#MyAppDebug", "INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+obj.getString("Title")+"','"+
									obj.getString("Body")+"','"+timestamp+"','"+obj.getString("Link")+"','"+"0"+"','"+obj.getString("Tag")+"');");
							messagesDB.execSQL("INSERT INTO messages(Title, Body, TS, HLink, IsRead, Tag) VALUES('"+obj.getString("Title")+"','"+
									obj.getString("Body")+"','"+timestamp+"','"+obj.getString("Link")+"','"+"0"+"','"+obj.getString("Tag")+"');");
							messagesDB.setTransactionSuccessful();
							messagesDB.endTransaction();
					} catch (SQLException e) {
						Log.d("#MyAppDebug MainActivity", "JSON DB insertion ERROR 1");
						e.printStackTrace();
					} catch (JSONException e) {
						Log.d("#MyAppDebug MainActivity", "JSON DB insertion ERROR 1");
						e.printStackTrace();
					}
					finally {
						//nothing
					}
				}
			}
			clearUpdateAdapter();
			// Display message on the screen
			//lblMessage.append(newMessage + "\n");			
			
			//Toast.makeText(getApplicationContext(), "Got Message: " + newMessage, Toast.LENGTH_LONG).show();

			// Releasing wake lock
			Log.d("#MyAppDebug", "Releasing wake lock");
			aController.releaseWakeLock();
		}
	};
	
	@Override
	protected void onDestroy() {
		Log.d("#MyAppDebugAPPState", "onDestroy");
		super.onStop();

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

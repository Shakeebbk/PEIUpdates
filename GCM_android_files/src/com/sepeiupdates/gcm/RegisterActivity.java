package com.sepeiupdates.gcm;

import com.sepeiupdates.gcm.Config.ConnectionStatus;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class RegisterActivity extends Activity {
	
	// UI elements
	EditText txtName; 
	TextView txtEmail;
	
	// Register button
	Button btnRegister;
	
	private int count = 0;
	private long startMillis=0;
	
	//Prefs
	public static final String MYPREFS= "MyLogin"; 

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_register);
		
		ConnectivityManager connectivityManager 
        = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
		
		getActionBar().setDisplayShowTitleEnabled(false);
		getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_logo));

		if((activeNetworkInfo != null && activeNetworkInfo.isConnected()) == false) {
			getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_logo_no_connection));
		}
		//Get Global Controller Class object (see application tag in AndroidManifest.xml)
		final Controller aController = (Controller) getApplicationContext();
		
		// Check if Internet Connection present
		if (!aController.isConnectingToInternet()) {
			
			// Internet Connection is not present
			aController.showAlertDialog(RegisterActivity.this,
					"Internet Connection Error",
					"Please connect to working Internet connection", false);
			
			// stop executing code by return
			return;
		}

		// Check if GCM configuration is set
		if (Config.YOUR_SERVER_URL == null || Config.GOOGLE_SENDER_ID == null || Config.YOUR_SERVER_URL.length() == 0
				|| Config.GOOGLE_SENDER_ID.length() == 0) {
			
			// GCM sernder id / server url is missing
			aController.showAlertDialog(RegisterActivity.this, "Configuration Error!",
					"Please set your Server URL and GCM Sender ID", false);
			
			// stop executing code by return
			 return;
		}
		
		//Get the Prefs
		final SharedPreferences settings = getSharedPreferences(MYPREFS, 0);
		
		// Getting intent
		Intent regIntent = getIntent();
		final Boolean isIntent = regIntent.getBooleanExtra("isIntent", false);
		
		if(settings.contains("userName") && (!isIntent)) {
			// Launch Main Activity
			final String name = settings.getString("userName", "");
			final String email = settings.getString("email", "");
			Intent i = new Intent(getApplicationContext(), MainActivity.class);
			
			// Registering user on our server					
			// Sending registraiton details to MainActivity
			i.putExtra("name", name);
			i.putExtra("email", email);
			startActivity(i);
			finish();
		}
		else {
			txtName = (EditText) findViewById(R.id.txtName);
			
			txtEmail = (TextView) findViewById(R.id.txtEmail);
	        String emailID = null;
	        Account[] accounts = AccountManager.get(this).getAccountsByType("com.google");
	        for (Account account : accounts) {
	         // this is where the email should be in: 
	          emailID = account.name;
	        }
	        txtEmail.setText(emailID);
	        txtEmail.setKeyListener(null);
	        Log.i("#MyAppDebug", "emailID = "+emailID);
	        
			btnRegister = (Button) findViewById(R.id.btnRegister);
			if(isIntent) {
				txtName.setText(settings.getString("userName", ""));
				txtEmail.setText(settings.getString("email", ""));
				Log.d("#MyAppDebug", "RegisterActivity(isIntent)"+isIntent);
			}
			
		// Click event on Register button
		btnRegister.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View arg0) {  
				// Get data from EditText 
				String name = txtName.getText().toString(); 
				String email = txtEmail.getText().toString();
				
				// Check if user filled the form
				if(name.trim().length() > 0 && email.trim().length() > 0){
					
					SharedPreferences.Editor editor = settings.edit();
					editor.putString("userName", name);
					editor.putString("email", email);
					editor.putBoolean("isReadFilter", false);
					editor.commit();
					
					// Launch Main Activity
					Intent i = new Intent(getApplicationContext(), MainActivity.class);
					
					// Registering user on our server					
					// Sending registraiton details to MainActivity
					i.putExtra("name", name);
					i.putExtra("email", email);
					startActivity(i);
					finish();
					
				}else{
					
					// user doen't filled that data
					aController.showAlertDialog(RegisterActivity.this, "Registration Error!", "Please check account details", false);
				}
			}
		});
	}
	}
	@Override
	public boolean onTouchEvent(MotionEvent event) {  

	    int eventaction = event.getAction();
	     if (eventaction == MotionEvent.ACTION_UP) {

	     //get system current milliseconds
	     long time= System.currentTimeMillis();


	     //if it is the first time, or if it has been more than 3 seconds since the first tap ( so it is like a new try), we reset everything 
	     if (startMillis==0 || (time-startMillis> 3000) ) {
	         startMillis=time;
	         count=1;
	     }
	     //it is not the first, and it has been  less than 3 seconds since the first
	     else{ //  time-startMillis< 3000   
	         count++;
	     }

	     if (count==7) {
	        //do whatever you need
	    	Log.d("#MyAppDebug EasterEgg", "SHAKEEB!");
	    	Intent i = new Intent(getApplicationContext(), EasterEggActivity.class);
			
			startActivity(i);
			//finish();
	     }
	     return true;    
	    }
	    return false;
	}

}

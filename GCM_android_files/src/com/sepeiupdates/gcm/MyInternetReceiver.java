package com.sepeiupdates.gcm;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class MyInternetReceiver extends BroadcastReceiver {
	@Override
	public void onReceive(Context context, Intent intent) {
		// TODO Auto-generated method stub
		Log.d("#MyAppDebug NetworkStateReceiver", "onReceive");
		
		Intent intentNew = new Intent(Config.DISPLAY_MESSAGE_ACTION);
		intentNew.putExtra(Config.EXTRA_MESSAGE, Config.ISINTERNET_CHANGE);
        
        // Send Broadcast to Broadcast receiver with message
        if(MainActivity.isVisible == true) {
        	Log.d("#MyAppDebug Registration", "display mesasage Intent");
        	context.sendBroadcast(intentNew);
        }
	}

}

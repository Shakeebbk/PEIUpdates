package com.sepeiupdates.gcm;

import android.app.Activity;
import android.os.Bundle;

public class EasterEggActivity extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.easter_egg_activity);
		
		getActionBar().hide();
	}
}
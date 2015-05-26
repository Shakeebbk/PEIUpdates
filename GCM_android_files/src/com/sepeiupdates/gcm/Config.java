package com.sepeiupdates.gcm;

public interface Config {

	
	// CONSTANTS
	//static final String YOUR_SERVER_URL =  "10.0.2.2";
	static final String YOUR_SERVER_URL =  "192.168.43.188";
	// YOUR_SERVER_URL : Server url where you have placed your server files
    // Google project id
    static final String GOOGLE_SENDER_ID = "845230925822";  // Place here your Google project id

    /**
     * Tag used on log messages.
     */
    static final String TAG = "GCM Android Example";

    static final String DISPLAY_MESSAGE_ACTION =
            "com.sepeiupdates.gcm.DISPLAY_MESSAGE";

    static final String EXTRA_MESSAGE = "message";
    
    static final String ISCONTROLLER = "#@123";
    static final String ISCONTROLLER_NOT_REGISTERED = "#@134_E_REG";
    static final String ISINTERNET_CHANGE = "#@134_CHECK_INTERNET";
    
    public enum ConnectionStatus{
    	REGSITER_ERROR, REGISTER_E_END, CONNECTION_ERROR, CONNECTED
    }
		
	
}

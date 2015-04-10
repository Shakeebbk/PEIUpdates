package com.sepeiupdates.gcm;

public class messageClass {
	String Title;
	String Body;
	String TimeStamp;
	String Link;
	int Id;
	int IsRead;
	String tag;
	public messageClass(int id, String title, String body, String timeStamp, String link, int isRead, String Tag) {
		super();
		Title = title;
		Body = body;
		TimeStamp = timeStamp;
		Link = link;
		Id = id;
		IsRead = isRead;
		tag=Tag;
	}
}

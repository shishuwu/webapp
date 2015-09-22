package com.jasonshi.service;
// TEST
public class App {
	public String print() {
		System.out.print("hello world");
		return "hello world";
	}

	public void sayHello() {
		System.out.println("say hello method");
	}

	public void bugMethod(String userName, String password) {
		String str = null;
		// Since str is null, the code should be find out
		System.out.println(str.length());
	}
}

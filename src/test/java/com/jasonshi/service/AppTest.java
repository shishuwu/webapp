package com.jasonshi.service;

import org.junit.Assert;
import org.junit.Test;

import com.jasonshi.service.App;

public class AppTest extends App {

	@Test
	public void testSucc() {
		App app = new App();
		Assert.assertEquals("hello world", app.print());
	}

	@Test
	public void testFail() {
		int i = 1 / 0;
		Assert.assertEquals(1, i);
	}
	
	@Test
	public void testSayHello() {
		App app = new App();
		app.sayHello();
	}
}

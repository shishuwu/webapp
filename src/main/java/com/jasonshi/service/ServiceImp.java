package com.jasonshi.service;

import com.shishuwu.rabbit.rabbit_common.CommonInterface;

public class ServiceImp implements CommonInterface{

	public String printx() {
		return "invoke print method";
	}

	public void sayHi() {
		System.out.println("Hi");
	}
}

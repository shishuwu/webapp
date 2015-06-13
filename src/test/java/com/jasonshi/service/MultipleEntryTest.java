package com.jasonshi.service;

import org.junit.Assert;
import org.junit.Test;

public class MultipleEntryTest {

	@Test
	public void testPrint() {
		Assert.assertEquals("web", new MultipleEntry().print());
	}

}

package webapp;

import org.junit.Assert;
import org.junit.Test;

public class AppTest extends App {

	@Test
	public void test() {
		App app = new App();
		Assert.assertEquals("hello world", app.print());
	}

	@Test
	public void testFail() {
		int i = 1 / 0;
		Assert.assertEquals(1, i);
	}
}

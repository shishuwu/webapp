====================================PURPOSE========================================

This is simple web application which is used to test following frameworks.
-- Maven integration
-- CI integration

=====================================NOTE==========================================
Some things need to be aware:

* Proxy: If the dev environment is behind a proxy, you need to configure in many places

	-- Maven: setting.xml (for Eclipse plugin, search "maven" > user settings > add or update the settings.xml)
			* For maven, you can use independent one 
			* Or use eclipse plugin (or you can link the maven to the independent one) 
			
	-- Git:  use following shell script 
			git config --global http.proxy "hostname:port"
		
				 
	-- CI: you also need to be aware of the proxy things. Such as:
			* When need to download plugins
			
			
* JDK version 
	-- Some plugins do not support 1.8 so far, such as findbugs plugin. Better use 1.7
				 
===================================== DONE ========================================

* 20150610: Integrate with CheckStype: 
	-- URL: http://maven.apache.org/plugins/maven-checkstyle-plugin/usage.html
	-- Basically the code convention, style...

* 20150610: Inegrate with FindBugs
	-- Can find potential bugs

* 20150609: Integrate with test coverage plugin: 
	-- cobertura: more refer to url http://my.oschina.net/dlpinghailinfeng/blog/301021

==================================== TODO =========================================

* Integrate with notification mechanism: mail?

* Check list
	- Run test 2 times ???
	- Check plugin config file?
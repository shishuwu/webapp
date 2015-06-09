=======================================PURPOSE===============================================

This is simple web application which is used to test following frameworks.
-- Maven integration
-- CI integration

========================================NOTE===============================================
Some things need to be aware:

* Proxy: If the dev environment is behind a proxy, you need to configure in many places

	-- Maven: setting.xml (for Eclipse plugin, search "maven" > user settings > add or update the settings.xml)
			* For maven, you can use independent one 
			* Or use eclipse plugin (or you can link the maven to the independent one) 
			
	-- Git:  use following shell script 
			git config --global http.proxy "hostname:port"
		
				 
	-- CI: you also need to be aware of the proxy things. Such as:
			* Download plugins
				 
===========================================TODO===============================================
* Integrate with test coverage plugin: ??

* Integrate with code check plugin: checkstyle?? 
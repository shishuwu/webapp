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
	-- Some plugins do not support 1.8 currently, such as findbugs plugin. Better use 1.7
	
* About Multiple Projects
	-- Suppose you 3 projects: pro-common, pro-client (rely on common), pro-server (rely on common)
	
		-- From original build/integration process: You must have all source code at one local machine. 
			* Then write shell and build one by one. 
			* If you want build each project on "different" machine independently. That won't work!!!

		-- For Maven: You need to setup a "Repository Server" (store private/public jar)
			* After build common, it will upload its jar to Server. [goal: install]
			* Other projects rely to common, could get latest common from the Server. Then do the build
			* (Different project could be in different machines to do build, only need to be aware of the sequence)
			
			Note: 
			1. When you change "common" code, you need to run the goal "install" to upload repository 
			   and other projects update their reference content.
			
			2. If have all code, it will be OK whether you have "local repository" or not, because you build by own.
			   But think about this situation: There are 2 team:
			   -- Platform team: develop common platform tools/jars
			   -- My team >> Alarm module team: develop alarm module which will use platform jars.
			   
			   The advantage is that: 
			   -- For my team: i do not need to get source code of platform
			   -- Need only set a pom dependency in my projects. And maven will get platform jars from repository server.
	
			3. Jenkins has maven plugin
				-- It can configure the maven "local repository": by default, stored at c:\.m2\repository

				 
===================================== DONE ========================================

* 20150613: Multiple projects testing
	-- Maven: Local Repository
	-- Jenkins: 
		-- Maven plugin: local repository (c:/.m2)
		-- "Multiple SCMs" plugin (in jenkins)

* 20150610: Notification with email
	-- Test successfully using smtp.163.com in Jenkins

* 20150610: Integrate with CheckStype: 
	-- URL: http://maven.apache.org/plugins/maven-checkstyle-plugin/usage.html
	-- Basically the code convention, style...

* 20150610: Inegrate with FindBugs
	-- Can find potential bugs

* 20150609: Integrate with test coverage plugin: 
	-- cobertura: more refer to url http://my.oschina.net/dlpinghailinfeng/blog/301021

==================================== TODO =========================================

* Multiple projects and remote projects

* Other language: such as C++ integration

* Check list
	- How to upload jars to central repository???
	- Run test 2 times ???
	- Check plugin config file?
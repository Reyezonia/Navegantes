if the second number of version is even or 0 then it is a stable else a unstable release

# v1.0.1 (2.12.2013)
+ fix __compareObjSync/build with default values in schema which arent defined in factory
+ err object should return null instead of false
+ TypeError: Cannot call method 'create' of undefined. this.model wasnt defined in build callback
+ fix _compareObjSync should iterate through passed obj not mObj

# v1.0.0 (1.12.2013)
+ mongoose functions, example instead of factory.model.find(), now factory.find()
+ default values for params
+ support for basic objects not only factory objects
+ error object returns error object
+ fix create method: create multiple bug
+ Api
+ History

# v0.0.2 (21.11.2013)
+ mangosta key operators start with a $ 
+ $child support for factory
+ factory is build on build
+ Readme
+ returns empty err as first callback parameter
+ multidoc creation with factory
+ renamed project to mangosta

# v0.0.1 (16.11.2013)
+ basic factory building and creation

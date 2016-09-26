function TimeObject() {
	this.start=0;
}

TimeObject.prototype.initialize = function(){
	this.start = Date.getTime();
}
TimeObject.prototype.getDelta = function(){
	if(this.start==0){
		this.start=Date.getTime();
	}
	return Date.getTime()-this.start;
}
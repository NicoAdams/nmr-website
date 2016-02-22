function iter(list, iterfunc) {
	for(var i=0; i<list.length; i++) {
		iterfunc(list[i])
	}
}

function testIter() {
	a = ["a", "b", "c"]
	b = []
	iter(a, function(e) {
		b.concat(e)
	})
}
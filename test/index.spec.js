describe("dome", function () {
  describe("get", function () {
    it("can get elements by id", function () {
      var el = document.getElementById('one');
      expect(dome.get("#one")[0]).toEqual(el);
    });
  }
}

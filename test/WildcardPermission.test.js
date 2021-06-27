import WildcardPermission from "../src/WildcardPermission";

describe("test WildcardPermission", () => {
  it("testNull", () => {
    expect(() => {
      new WildcardPermission(null);
    }).toThrow();
  });

  it("testEmpty", () => {
    expect(() => {
      new WildcardPermission("");
    }).toThrow();
  });

  it("testBlank", () => {
    expect(() => {
      new WildcardPermission("   ");
    }).toThrow();
  });

  it("testOnlyDelimiters", () => {
    expect(() => {
      new WildcardPermission("::,,::,:");
    }).toThrow();
  });

  it("testNamed", () => {
    var p1, p2;

    // Case insensitive, same
    p1 = new WildcardPermission("something");
    p2 = new WildcardPermission("something");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p2.implies(p1)).toBeTruthy();

    // Case insensitive, different case
    p1 = new WildcardPermission("something");
    p2 = new WildcardPermission("SOMETHING");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p2.implies(p1)).toBeTruthy();

    // Case insensitive, different word
    p1 = new WildcardPermission("something");
    p2 = new WildcardPermission("else");
    expect(p1.implies(p2)).toBeFalsy();
    expect(p2.implies(p1)).toBeFalsy();

    // Case sensitive same
    p1 = new WildcardPermission("BLAHBLAH", false);
    p2 = new WildcardPermission("BLAHBLAH", false);
    expect(p1.implies(p2)).toBeTruthy();
    expect(p2.implies(p1)).toBeTruthy();

    // Case sensitive, different case
    p1 = new WildcardPermission("BLAHBLAH", false);
    p2 = new WildcardPermission("bLAHBLAH", false);
    expect(p1.implies(p2)).toBeTruthy();
    expect(p2.implies(p1)).toBeTruthy();

    // Case sensitive, different word
    p1 = new WildcardPermission("BLAHBLAH", false);
    p2 = new WildcardPermission("whatwhat", false);
    expect(p1.implies(p2)).toBeFalsy();
    expect(p2.implies(p1)).toBeFalsy();
  });

  it("testLists", () => {
    var p1, p2, p3;

    p1 = new WildcardPermission("one,two");
    p2 = new WildcardPermission("one");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p2.implies(p1)).toBeFalsy();

    p1 = new WildcardPermission("one,two,three");
    p2 = new WildcardPermission("one,three");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p2.implies(p1)).toBeFalsy();

    p1 = new WildcardPermission("one,two:one,two,three");
    p2 = new WildcardPermission("one:three");
    p3 = new WildcardPermission("one:two,three");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p2.implies(p1)).toBeFalsy();
    expect(p1.implies(p3)).toBeTruthy();
    expect(p2.implies(p3)).toBeFalsy();
    expect(p3.implies(p2)).toBeTruthy();

    p1 = new WildcardPermission("one,two,three:one,two,three:one,two");
    p2 = new WildcardPermission("one:three:two");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p2.implies(p1)).toBeFalsy();

    p1 = new WildcardPermission("one");
    p2 = new WildcardPermission("one:two,three,four");
    p3 = new WildcardPermission("one:two,three,four:five:six:seven");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p1.implies(p3)).toBeTruthy();
    expect(p2.implies(p1)).toBeFalsy();
    expect(p3.implies(p1)).toBeFalsy();
    expect(p2.implies(p3)).toBeTruthy();
  });

  /**
   * Validates WildcardPermissions with that contain the same list parts are equal.
   */
  it("testListDifferentOrder", () => {
    var p6 = new WildcardPermission("one,two:three,four");
    var p6DiffOrder = new WildcardPermission("two,one:four,three");
    expect(p6.getParts()[0]).toEqual(expect.arrayContaining(p6DiffOrder.getParts()[0]));
    expect(p6.getParts()[1]).toEqual(expect.arrayContaining(p6DiffOrder.getParts()[1]));
  });

  it("testWildcards", () => {
    var p1, p2, p3, p4, p5, p6, p7, p8, p9;

    p1 = new WildcardPermission("*");
    p2 = new WildcardPermission("one");
    p3 = new WildcardPermission("one:two");
    p4 = new WildcardPermission("one,two:three,four");
    p5 = new WildcardPermission("one,two:three,four,five:six:seven,eight");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p1.implies(p3)).toBeTruthy();
    expect(p1.implies(p4)).toBeTruthy();
    expect(p1.implies(p5)).toBeTruthy();

    p1 = new WildcardPermission("newsletter:*");
    p2 = new WildcardPermission("newsletter:read");
    p3 = new WildcardPermission("newsletter:read,write");
    p4 = new WildcardPermission("newsletter:*");
    p5 = new WildcardPermission("newsletter:*:*");
    p6 = new WildcardPermission("newsletter:*:read");
    p7 = new WildcardPermission("newsletter:write:*");
    p8 = new WildcardPermission("newsletter:read,write:*");
    p9 = new WildcardPermission("newsletter");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p1.implies(p3)).toBeTruthy();
    expect(p1.implies(p4)).toBeTruthy();
    expect(p1.implies(p5)).toBeTruthy();
    expect(p1.implies(p6)).toBeTruthy();
    expect(p1.implies(p7)).toBeTruthy();
    expect(p1.implies(p8)).toBeTruthy();
    expect(p1.implies(p9)).toBeTruthy();

    p1 = new WildcardPermission("newsletter:*:*");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p1.implies(p3)).toBeTruthy();
    expect(p1.implies(p4)).toBeTruthy();
    expect(p1.implies(p5)).toBeTruthy();
    expect(p1.implies(p6)).toBeTruthy();
    expect(p1.implies(p7)).toBeTruthy();
    expect(p1.implies(p8)).toBeTruthy();
    expect(p1.implies(p9)).toBeTruthy();

    p1 = new WildcardPermission("newsletter:*:*:*");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p1.implies(p3)).toBeTruthy();
    expect(p1.implies(p4)).toBeTruthy();
    expect(p1.implies(p5)).toBeTruthy();
    expect(p1.implies(p6)).toBeTruthy();
    expect(p1.implies(p7)).toBeTruthy();
    expect(p1.implies(p8)).toBeTruthy();
    expect(p1.implies(p9)).toBeTruthy();

    p1 = new WildcardPermission("newsletter");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p1.implies(p3)).toBeTruthy();
    expect(p1.implies(p4)).toBeTruthy();
    expect(p1.implies(p5)).toBeTruthy();
    expect(p1.implies(p6)).toBeTruthy();
    expect(p1.implies(p7)).toBeTruthy();
    expect(p1.implies(p8)).toBeTruthy();
    expect(p1.implies(p9)).toBeTruthy();

    p1 = new WildcardPermission("newsletter:*:read");
    p2 = new WildcardPermission("newsletter:123:read");
    p3 = new WildcardPermission("newsletter:123,456:read,write");
    p4 = new WildcardPermission("newsletter:read");
    p5 = new WildcardPermission("newsletter:read,write");
    p6 = new WildcardPermission("newsletter:123:read:write");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p1.implies(p3)).toBeFalsy();
    expect(p1.implies(p4)).toBeFalsy();
    expect(p1.implies(p5)).toBeFalsy();
    expect(p1.implies(p6)).toBeTruthy();

    p1 = new WildcardPermission("newsletter:*:read:*");
    expect(p1.implies(p2)).toBeTruthy();
    expect(p1.implies(p6)).toBeTruthy();
  });

  it("testWildcardLeftTermination", () => {
    var p1, p2, p3, p4;

    p1 = new WildcardPermission("one");
    p2 = new WildcardPermission("one:*");
    p3 = new WildcardPermission("one:*:*");
    p4 = new WildcardPermission("one:read");

    expect(p1.implies(p2)).toBeTruthy();
    expect(p1.implies(p3)).toBeTruthy();
    expect(p1.implies(p4)).toBeTruthy();

    expect(p2.implies(p1)).toBeTruthy();
    expect(p2.implies(p3)).toBeTruthy();
    expect(p2.implies(p4)).toBeTruthy();

    expect(p3.implies(p1)).toBeTruthy();
    expect(p3.implies(p2)).toBeTruthy();
    expect(p3.implies(p4)).toBeTruthy();

    expect(p4.implies(p1)).toBeFalsy();
    expect(p4.implies(p2)).toBeFalsy();
    expect(p4.implies(p3)).toBeFalsy();
  });
});

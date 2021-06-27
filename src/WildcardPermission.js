/**
 * Default no-arg constructor for subclasses only - end-user developers instantiating Permission instances must
 * provide a wildcard string at a minimum, since Permission instances are immutable once instantiated.
 * <p/>
 * Note that the WildcardPermission class is very robust and typically subclasses are not necessary unless you
 * wish to create type-safe Permission objects that would be used in your application, such as perhaps a
 * {@code UserPermission}, {@code SystemPermission}, {@code PrinterPermission}, etc.  If you want such type-safe
 * permission usage, consider subclassing the {@link DomainPermission} class for your needs.
 * @param {string} wildcardString
 * @param {boolean} caseSensitive
 * @class
 */
var WildcardPermission = (function() {
  function WildcardPermission(wildcardString, caseSensitive) {
    if (this.parts === undefined) {
      this.parts = null;
    }
    if (!caseSensitive) {
      caseSensitive = WildcardPermission.DEFAULT_CASE_SENSITIVE;
    }
    this.setParts(wildcardString, caseSensitive);
  }
  WildcardPermission.clean = function(__in) {
    var out = __in;
    if (__in != null) {
      out = __in.trim();
      if (out.length === 0) {
        out = null;
      }
    }
    return out;
  };
  WildcardPermission.prototype.setParts = function(wildcardString, caseSensitive) {
    wildcardString = WildcardPermission.clean(wildcardString);
    if (wildcardString == null || wildcardString.length === 0) {
      throw new Error("Wildcard string cannot be null or empty. Make sure permission strings are properly formatted.");
    }
    if (!caseSensitive) {
      wildcardString = wildcardString.toLowerCase();
    }
    var partArray = wildcardString.split(WildcardPermission.PART_DIVIDER_TOKEN);
    //fixme hack java split
    var parts = partArray.every(v => !v) ? [] : partArray;
    this.parts = [];
    for (var index = 0; index < parts.length; index++) {
      var part = parts[index];
      //fixme hack java split
      var subpartArray = part.split(WildcardPermission.SUBPART_DIVIDER_TOKEN);
      var subparts = subpartArray.every(v => !v) ? [] : subpartArray;
      if (subparts.length == 0) {
        throw new Error("Wildcard string cannot contain parts with only dividers. Make sure permission strings are properly formatted.");
      }
      this.parts.push(subparts);
    }
    if (this.parts.length == 0) {
      throw new Error("Wildcard string cannot contain only dividers. Make sure permission strings are properly formatted.");
    }
  };
  WildcardPermission.prototype.getParts = function() {
    return this.parts;
  };
  WildcardPermission.prototype.implies = function(p) {
    if (!(p != null && p instanceof WildcardPermission)) {
      return false;
    }
    var wp = p;
    var otherParts = wp.getParts();
    var i = 0;
    for (var index = 0; index < otherParts.length; index++) {
      var otherPart = otherParts[index];
      if (this.getParts().length - 1 < i) {
        return true;
      } else {
        var part = this.getParts()[i];
        if (!(part.indexOf(WildcardPermission.WILDCARD_TOKEN) >= 0) && !otherPart.every(v => part.indexOf(v) >= 0)) {
          return false;
        }
        i++;
      }
    }
    for (; i < this.getParts().length; i++) {
      part = this.getParts()[i];
      if (!(part.indexOf(WildcardPermission.WILDCARD_TOKEN) >= 0)) {
        return false;
      }
    }
    return true;
  };

  WildcardPermission.WILDCARD_TOKEN = "*";
  WildcardPermission.PART_DIVIDER_TOKEN = ":";
  WildcardPermission.SUBPART_DIVIDER_TOKEN = ",";
  WildcardPermission.DEFAULT_CASE_SENSITIVE = false;
  return WildcardPermission;
})();

export default WildcardPermission;
const GetQueryString = function (name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //search,查询？后面的参数，并匹配正则
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
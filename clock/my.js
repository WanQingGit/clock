/**
 * Created by WanQing on 2016/10/28.
 */
var a=[];
window.onload=function(){
    console.info("qing");
    a.push(bas());
    a.push(bas());
    a.push(bas());
    alert(a.length);
    a.pop(a[1]);
    alert(a.length);
    alert(a[1]);
    alert(document.body.clientWidth);
    alert(document.body.clientHeight);
    test();

}
function bas(){
    return {
        test:Math.random()
    }
}
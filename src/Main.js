/**
 * 
 * @author hp
 * @name Main
 */

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
	var inf = new gInfoRoom();
        inf.showModal();
}//GEN-LAST:event_button1ActionPerformed

function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
var infGuest = new showGuestInfo(); 
infGuest.showModal();
}//GEN-LAST:event_button2ActionPerformed

function button3ActionPerformed(evt) {//GEN-FIRST:event_button3ActionPerformed
var ds = new addGuest();
ds.showModal();
    // TODO Добавьте свой код:
}//GEN-LAST:event_button3ActionPerformed

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
var ex = new Password();
close();
ex.showModal();

    // TODO Добавьте свой код:
}//GEN-LAST:event_buttonActionPerformed

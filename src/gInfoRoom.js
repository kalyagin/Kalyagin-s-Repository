/**
 * 
 * @author hp
 * @name gInfoRoom
 */

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
    var freeR = new gFreeRooms();
    freeR.showModal();
}//GEN-LAST:event_button1ActionPerformed

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
var reserv = new gShowReservarion();
reserv.showModal();
}//GEN-LAST:event_buttonActionPerformed

function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
close();
}//GEN-LAST:event_button2ActionPerformed

/**
 * @public
 * @author михаил
 * @name GuestName
 *  
 */ 
Select t1.GUEST_ID, (t1.NAME || ' ' || t1.SURNAME) AS fullName, t1.BDAY
, t1.SEX 
From GUESTS t1
 Where t1.SURNAME Like :lastNamePattern
/**
 *
 * @author hp
 * @name qGetExitGuest
 */ 
Select * 
From GUESTVISITING t1
 Inner Join GUEST t on t1.GUEST_ID = t.GUEST_ID
 Where :GetExitGuest > t1.EXIT
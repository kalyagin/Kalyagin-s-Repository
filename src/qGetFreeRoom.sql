/**
 *
 * @author hp
 * @name qGetFreeRoom
 */ 
Select *
From ROOMTYPE t1
 Inner Join ROOMS t on t1.ROOMTYPE_ID = t.ROOMTYPE_ID
 Where :freeRooms Like t1.STATUS
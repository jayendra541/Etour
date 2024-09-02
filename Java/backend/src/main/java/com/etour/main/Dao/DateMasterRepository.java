package com.etour.main.Dao;

import com.etour.main.models.DateMaster;
import com.etour.main.models.SubCategoryMaster;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DateMasterRepository extends JpaRepository<DateMaster, Integer> {
	 List<DateMaster> findByDepartDateBetween(Date startDate, Date endDate);
	 List<DateMaster> findBySubCategoryMaster_SubCatId(Integer subCategoryId);
//	 List<DateMaster> findByCategoryMaster_Catmaster_id(Integer catmaster_id);
	 
	 @Query("SELECT d FROM DateMaster d WHERE d.categoryMaster.catmaster_id = :catmasterId")
	    List<DateMaster> findByCategoryMaster_Catmaster_id(@Param("catmasterId") Integer catmasterId);

	 
	 @Query("SELECT d FROM DateMaster d WHERE d.departDate BETWEEN :startDate AND :endDate OR d.endDate BETWEEN :startDate AND :endDate")
	    List<DateMaster> findAllByDateRange(
	        @Param("startDate") Date startDate, 
	        @Param("endDate") Date endDate
	    );
	 
	    @Query("SELECT d.subCategoryMaster FROM DateMaster d WHERE d.noOfDays = :noOfDays")
	    List<SubCategoryMaster> findSubCategoriesByNoOfDays(@Param("noOfDays") Integer noOfDays);
	    
	    @Query("SELECT d FROM DateMaster d WHERE d.subCategoryMaster.subCatId = :subCatId")
	    List<DateMaster> findBySubCategoryId(@Param("subCatId") Integer subCatId);
}

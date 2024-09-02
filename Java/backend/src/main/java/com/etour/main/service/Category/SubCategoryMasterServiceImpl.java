package com.etour.main.service.Category;

import com.etour.main.models.CategoryMaster;
import com.etour.main.models.CostMaster;
import com.etour.main.models.SubCategoryMaster;
import com.etour.main.Dao.CostMasterRepository;
import com.etour.main.Dao.SubCategoryMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class SubCategoryMasterServiceImpl implements SubCategoryMasterService {

    private final SubCategoryMasterRepository subCategoryMasterRepository;
    @Autowired
    private CostMasterRepository costMasterRepository;

    @Autowired
    public SubCategoryMasterServiceImpl(SubCategoryMasterRepository subCategoryMasterRepository) {
        this.subCategoryMasterRepository = subCategoryMasterRepository;
    }

    @Override
    public List<SubCategoryMaster> findAll() {
        return subCategoryMasterRepository.findAll();
    }

    @Override
    public Optional<SubCategoryMaster> findById(Integer id) {
        return subCategoryMasterRepository.findById(id);
    }

    @Override
    public SubCategoryMaster save(SubCategoryMaster subCategoryMaster) {
        return subCategoryMasterRepository.save(subCategoryMaster);
    }

    @Override
    public SubCategoryMaster updateById(Integer id, SubCategoryMaster updatedSubCategoryMaster) {
        if (subCategoryMasterRepository.existsById(id)) {
            updatedSubCategoryMaster.setSubCat_id(id);
            return subCategoryMasterRepository.save(updatedSubCategoryMaster);
        } else {
            throw new RuntimeException("SubCategoryMaster not found with id: " + id);
        }
    }

    @Override
    public void deleteById(Integer id) {
        if (subCategoryMasterRepository.existsById(id)) {
            subCategoryMasterRepository.deleteById(id);
        } else {
            throw new RuntimeException("SubCategoryMaster not found with id: " + id);
        }
    }
//    @Override
//    public List<SubCategoryMaster> findAllByCategoryId(Long categoryId) {
//        return subCategoryMasterRepository.findAllByCategoryId(categoryId);
//    }

	@Override
	public List<SubCategoryMaster> findAllByCategoryId(Long categoryId) {
		// TODO Auto-generated method stub
		return subCategoryMasterRepository.findAllByCategoryId(categoryId);
	}

//	@Override
//	public List<SubCategoryMaster> findAllCostBySubCategoryId(Long subCategoryId) {
//		// TODO Auto-generated method stub
//		return subCategoryMasterRepository.findAllCostBySubCategoryId(subCategoryId);
//	}
	@Override
	public List<CostMaster> findCostsBySubCategoryId(Long subCategoryId) {
	    return subCategoryMasterRepository.findCostsBySubCategoryId(subCategoryId);
	}
	
//	public List<SubCategoryMaster> searchBySubCatName(String subCatName) {
//        return subCategoryMasterRepository.findBySubCatName(subCatName);
//    }
	
	public List<SubCategoryMaster> searchBySubCatName(String subCatName) {
        // Using `StartingWith` to search by the start of the name
        return subCategoryMasterRepository.findBySubCatNameStartingWith(subCatName);
    }
	
	@Override
    public List<SubCategoryMaster> findSubCategoriesByCostRange(BigDecimal minCost, BigDecimal maxCost) {
        List<CostMaster> costMasters = costMasterRepository.findByCostBetween(minCost, maxCost);
        return subCategoryMasterRepository.findByCostMastersIn(costMasters);
    }
	
	
	


}

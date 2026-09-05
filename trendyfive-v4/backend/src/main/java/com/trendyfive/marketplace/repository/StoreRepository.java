package com.trendyfive.marketplace.repository;
import com.trendyfive.marketplace.entity.StoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface StoreRepository extends JpaRepository<StoreEntity,Long> { List<StoreEntity> findByCityIgnoreCase(String city); }

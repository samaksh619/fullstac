package com.trendyfive.marketplace.repository;
import com.trendyfive.marketplace.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProductRepository extends JpaRepository<ProductEntity,String> {}

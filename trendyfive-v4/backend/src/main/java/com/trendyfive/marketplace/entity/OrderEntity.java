package com.trendyfive.marketplace.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="orders")
public class OrderEntity {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    private String productId; private String productName; private String variant; private String storage;
    private Integer months; private BigDecimal monthlyAmount; private String interest; private LocalDateTime createdAt;
    @PrePersist void onCreate(){createdAt=LocalDateTime.now();}
    public Long getId(){return id;} public String getProductId(){return productId;} public void setProductId(String v){productId=v;}
    public String getProductName(){return productName;} public void setProductName(String v){productName=v;} public String getVariant(){return variant;} public void setVariant(String v){variant=v;}
    public String getStorage(){return storage;} public void setStorage(String v){storage=v;} public Integer getMonths(){return months;} public void setMonths(Integer v){months=v;}
    public BigDecimal getMonthlyAmount(){return monthlyAmount;} public void setMonthlyAmount(BigDecimal v){monthlyAmount=v;} public String getInterest(){return interest;} public void setInterest(String v){interest=v;}
    public LocalDateTime getCreatedAt(){return createdAt;}
}

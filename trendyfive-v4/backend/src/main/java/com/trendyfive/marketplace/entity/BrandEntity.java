package com.trendyfive.marketplace.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "brands")
public class BrandEntity {
    @Id private String name;
    private String tagline;
    private String badge;
    private int productCount;
    public BrandEntity() {}
    public BrandEntity(String name,String tagline,String badge,int productCount){this.name=name;this.tagline=tagline;this.badge=badge;this.productCount=productCount;}
    public String getName(){return name;} public void setName(String v){name=v;}
    public String getTagline(){return tagline;} public void setTagline(String v){tagline=v;}
    public String getBadge(){return badge;} public void setBadge(String v){badge=v;}
    public int getProductCount(){return productCount;} public void setProductCount(int v){productCount=v;}
}

package com.trendyfive.marketplace.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "stores")
public class StoreEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String city; private String name; private String area; private String type; private String distance; private String icon; private String featuredBrand;
    public StoreEntity() {}
    public StoreEntity(String city,String name,String area,String type,String distance,String icon,String featuredBrand){this.city=city;this.name=name;this.area=area;this.type=type;this.distance=distance;this.icon=icon;this.featuredBrand=featuredBrand;}
    public Long getId(){return id;} public String getCity(){return city;} public void setCity(String v){city=v;}
    public String getName(){return name;} public void setName(String v){name=v;} public String getArea(){return area;} public void setArea(String v){area=v;}
    public String getType(){return type;} public void setType(String v){type=v;} public String getDistance(){return distance;} public void setDistance(String v){distance=v;}
    public String getIcon(){return icon;} public void setIcon(String v){icon=v;} public String getFeaturedBrand(){return featuredBrand;} public void setFeaturedBrand(String v){featuredBrand=v;}
}

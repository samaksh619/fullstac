package com.trendyfive.marketplace.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class ProductEntity {
    @Id private String id;
    private String name;
    private String brand;
    private String category;
    private BigDecimal price;
    @Lob private String image;
    @Lob private String description;
    @Lob private String specsJson;
    @Lob private String variantsJson;
    @Lob private String emiPlansJson;

    public ProductEntity() {}
    public ProductEntity(String id, String name, String brand, String category, BigDecimal price, String image, String description, String specsJson, String variantsJson, String emiPlansJson) {
        this.id=id; this.name=name; this.brand=brand; this.category=category; this.price=price; this.image=image; this.description=description;
        this.specsJson=specsJson; this.variantsJson=variantsJson; this.emiPlansJson=emiPlansJson;
    }
    public String getId(){return id;} public void setId(String v){id=v;}
    public String getName(){return name;} public void setName(String v){name=v;}
    public String getBrand(){return brand;} public void setBrand(String v){brand=v;}
    public String getCategory(){return category;} public void setCategory(String v){category=v;}
    public BigDecimal getPrice(){return price;} public void setPrice(BigDecimal v){price=v;}
    public String getImage(){return image;} public void setImage(String v){image=v;}
    public String getDescription(){return description;} public void setDescription(String v){description=v;}
    public String getSpecsJson(){return specsJson;} public void setSpecsJson(String v){specsJson=v;}
    public String getVariantsJson(){return variantsJson;} public void setVariantsJson(String v){variantsJson=v;}
    public String getEmiPlansJson(){return emiPlansJson;} public void setEmiPlansJson(String v){emiPlansJson=v;}
}

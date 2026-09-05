package com.trendyfive.marketplace.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendyfive.marketplace.entity.ProductEntity;
import com.trendyfive.marketplace.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CatalogService {
    private final ProductRepository products; private final ObjectMapper mapper;
    public CatalogService(ProductRepository products,ObjectMapper mapper){this.products=products;this.mapper=mapper;}
    public Map<String,Object> toMap(ProductEntity p){
        Map<String,Object> m=new LinkedHashMap<>(); m.put("id",p.getId());m.put("name",p.getName());m.put("brand",p.getBrand());m.put("category",p.getCategory());m.put("price",p.getPrice());m.put("image",p.getImage());m.put("description",p.getDescription());
        try { m.put("specs",mapper.readValue(p.getSpecsJson(),new TypeReference<List<String>>(){})); m.put("variants",mapper.readValue(p.getVariantsJson(),new TypeReference<List<Map<String,Object>>>(){})); m.put("emiPlans",mapper.readValue(p.getEmiPlansJson(),new TypeReference<List<Map<String,Object>>>(){})); }
        catch(Exception e){ throw new IllegalStateException("Stored product data is invalid",e); }
        return m;
    }
    public List<Map<String,Object>> all(){return products.findAll().stream().map(this::toMap).toList();}
    public Map<String,Object> one(String id){return products.findById(id).map(this::toMap).orElseThrow(()->new NoSuchElementException("We could not find that product."));}
}

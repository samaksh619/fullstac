package com.trendyfive.marketplace.controller;

import com.trendyfive.marketplace.entity.*;
import com.trendyfive.marketplace.repository.*;
import com.trendyfive.marketplace.service.CatalogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequestMapping("/api")
public class CatalogController {
    private final CatalogService catalog; private final BrandRepository brands; private final StoreRepository stores;
    public CatalogController(CatalogService catalog,BrandRepository brands,StoreRepository stores){this.catalog=catalog;this.brands=brands;this.stores=stores;}
    @GetMapping("/health") public Map<String,String> health(){return Map.of("status","ok","service","trendyfive-marketplace-api");}
    @GetMapping("/products") public List<Map<String,Object>> products(){return catalog.all();}
    @GetMapping("/products/{id}") public Map<String,Object> product(@PathVariable String id){return catalog.one(id);}
    @GetMapping("/products/{id}/emi-plans") public Object emiPlans(@PathVariable String id){return catalog.one(id).get("emiPlans");}
    @GetMapping("/brands") public List<BrandEntity> brands(){return brands.findAll();}
    @GetMapping("/stores") public List<StoreEntity> stores(@RequestParam(defaultValue="Bengaluru") String city){return stores.findByCityIgnoreCase(city);}
    @GetMapping("/cities") public List<String> cities(){return stores.findAll().stream().map(StoreEntity::getCity).distinct().sorted().toList();}
}

package com.trendyfive.marketplace.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendyfive.marketplace.entity.*;
import com.trendyfive.marketplace.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import java.math.BigDecimal;
import java.util.*;

@Configuration
public class DataSeeder {
    @Bean CommandLineRunner seed(ProductRepository products, BrandRepository brands, StoreRepository stores, ObjectMapper mapper) {
        return args -> {
            if(products.count()==0){
                var list=mapper.readValue(new ClassPathResource("data/products.json").getInputStream(),new TypeReference<List<Map<String,Object>>>(){});
                for(var p:list){products.save(new ProductEntity((String)p.get("id"),(String)p.get("name"),(String)p.get("brand"),(String)p.get("category"),new BigDecimal(p.get("price").toString()),(String)p.get("image"),(String)p.get("description"),mapper.writeValueAsString(p.get("specs")),mapper.writeValueAsString(p.get("variants")),mapper.writeValueAsString(p.get("emiPlans"))));}
            }
            if(brands.count()==0){
                var list=mapper.readValue(new ClassPathResource("data/brands.json").getInputStream(),new TypeReference<List<Map<String,Object>>>(){});
                for(var b:list) brands.save(new BrandEntity((String)b.get("name"),(String)b.get("tagline"),(String)b.get("badge"),Integer.parseInt(b.get("count").toString())));
            }
            if(stores.count()==0){
                var cities=mapper.readValue(new ClassPathResource("data/storesByCity.json").getInputStream(),new TypeReference<Map<String,List<Map<String,Object>>>>(){});
                for(var entry:cities.entrySet()) for(var s:entry.getValue()) stores.save(new StoreEntity(entry.getKey(),(String)s.get("name"),(String)s.get("area"),(String)s.get("type"),(String)s.get("distance"),(String)s.get("icon"),(String)s.get("featuredBrand")));
            }
        };
    }
}

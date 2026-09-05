package com.trendyfive.marketplace.controller;

import com.trendyfive.marketplace.dto.OrderRequest;
import com.trendyfive.marketplace.entity.OrderEntity;
import com.trendyfive.marketplace.repository.OrderRepository;
import com.trendyfive.marketplace.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/orders")
public class OrderController {
    private final OrderRepository orders; private final ProductRepository products;
    public OrderController(OrderRepository orders,ProductRepository products){this.orders=orders;this.products=products;}
    @PostMapping public ResponseEntity<?> create(@Valid @RequestBody OrderRequest r){
        if(!products.existsById(r.productId())) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(java.util.Map.of("message","Product not found"));
        OrderEntity o=new OrderEntity(); o.setProductId(r.productId());o.setProductName(r.productName());o.setVariant(r.variant());o.setStorage(r.storage());o.setMonths(r.months());o.setMonthlyAmount(r.monthlyAmount());o.setInterest(r.interest());
        var saved=orders.save(o); return ResponseEntity.status(HttpStatus.CREATED).body(java.util.Map.of("orderId",saved.getId(),"status","PLAN_SELECTED","message","EMI plan selected successfully"));
    }
}

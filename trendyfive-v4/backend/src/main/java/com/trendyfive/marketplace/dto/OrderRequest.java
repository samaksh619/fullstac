package com.trendyfive.marketplace.dto;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
public record OrderRequest(
    @NotBlank String productId,
    @NotBlank String productName,
    @NotBlank String variant,
    @NotBlank String storage,
    @NotNull @Min(1) Integer months,
    @NotNull @Positive BigDecimal monthlyAmount,
    @NotBlank String interest
) {}

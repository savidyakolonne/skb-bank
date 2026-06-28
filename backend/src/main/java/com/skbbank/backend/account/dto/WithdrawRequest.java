package com.skbbank.backend.account.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class WithdrawRequest {

    private BigDecimal amount;
}

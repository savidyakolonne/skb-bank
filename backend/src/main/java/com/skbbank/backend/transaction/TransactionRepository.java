package com.skbbank.backend.transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByAccountId(Long accountId);

    List<Transaction> findByAccountUserId(Long userId);

    List<Transaction> findByAccountUserIdOrderByCreatedAtDesc(Long userId);

    List<Transaction> findTop5ByOrderByCreatedAtDesc();

}
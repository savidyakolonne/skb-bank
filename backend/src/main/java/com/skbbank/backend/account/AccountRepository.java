package com.skbbank.backend.account;

import com.skbbank.backend.account.enums.AccountStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByAccountNumber(String accountNumber);

    List<Account> findByUserId(Long userId);

    List<Account> findAllByOrderByCreatedAtDesc();

    boolean existsByAccountNumber(String accountNumber);

    long countByStatus(AccountStatus status);

    @Query("""
            SELECT COALESCE(SUM(a.balance), 0)
            FROM Account a
            """)
    BigDecimal getTotalBankBalance();

}
package com.skbbank.backend.analytics;

import com.skbbank.backend.account.AccountRepository;
import com.skbbank.backend.account.enums.AccountStatus;
import com.skbbank.backend.analytics.dto.AnalyticsResponse;
import com.skbbank.backend.analytics.dto.MonthlyTransactionResponse;
import com.skbbank.backend.transaction.TransactionRepository;
import com.skbbank.backend.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Service
public class AnalyticsService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public AnalyticsService(
            UserRepository userRepository,
            AccountRepository accountRepository,
            TransactionRepository transactionRepository
    ) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    public AnalyticsResponse getDashboardAnalytics() {

        List<Object[]> results =
                transactionRepository.getMonthlyTransactions();

        List<MonthlyTransactionResponse> monthlyTransactions =
                new ArrayList<>();

        for (Object[] row : results){
            Integer month =
                    ((Number) row[0]).intValue();

            Long total =
                    ((Number) row[1]).longValue();

            monthlyTransactions.add(

                    new MonthlyTransactionResponse(
                            Month.of(month).name(),

                            total
                    )
            );
        }

        return new AnalyticsResponse(

                userRepository.count(),

                accountRepository.count(),

                transactionRepository.count(),

                accountRepository.getTotalBankBalance(),

                accountRepository.countByStatus(AccountStatus.ACTIVE),

                accountRepository.countByStatus(AccountStatus.FROZEN),

                accountRepository.countByStatus(AccountStatus.CLOSED),

                monthlyTransactions

        );

    }

}

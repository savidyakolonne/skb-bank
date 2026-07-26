package com.skbbank.backend.analytics;

import com.skbbank.backend.account.AccountRepository;
import com.skbbank.backend.account.enums.AccountStatus;
import com.skbbank.backend.analytics.dto.AnalyticsResponse;
import com.skbbank.backend.transaction.TransactionRepository;
import com.skbbank.backend.user.UserRepository;
import org.springframework.stereotype.Service;

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

        return new AnalyticsResponse(

                userRepository.count(),

                accountRepository.count(),

                transactionRepository.count(),

                accountRepository.getTotalBankBalance(),

                accountRepository.countByStatus(AccountStatus.ACTIVE),

                accountRepository.countByStatus(AccountStatus.FROZEN),

                accountRepository.countByStatus(AccountStatus.CLOSED)

        );

    }

}

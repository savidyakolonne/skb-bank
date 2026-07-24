package com.skbbank.backend.dashboard;

import com.skbbank.backend.common.response.ApiResponse;
import com.skbbank.backend.common.security.CustomUserDetails;
import com.skbbank.backend.dashboard.dto.DashboardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ){
        DashboardResponse response =
                dashboardService.getDashboard(userDetails.getUser().getId());

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Dashboard loaded successfully",
                        response
                )
        );
    }
}

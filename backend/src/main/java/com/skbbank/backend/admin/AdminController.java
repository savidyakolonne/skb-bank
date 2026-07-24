package com.skbbank.backend.admin;

import com.skbbank.backend.admin.dto.AdminDashboardResponse;
import com.skbbank.backend.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(
        name = "Admin",
        description = "Admin APIs"
)
@SecurityRequirement(name = "Bearer Authentication")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @Operation(summary = "Get admin dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/dashboard")
    public ApiResponse<AdminDashboardResponse> getDashboard() {

        AdminDashboardResponse dashboard =
                adminService.getDashboard();

        return new ApiResponse<>(
                true,
                "Admin dashboard loaded successfully",
                dashboard
        );

    }

}
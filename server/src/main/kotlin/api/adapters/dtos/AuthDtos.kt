package api.adapters.dtos

import kotlinx.serialization.Serializable

@Serializable
data class LoginDto(
    val email: String,
    val password: String,
)

@Serializable
data class RegisterDto(
    val email: String,
    val password: String,
    val confirmPassword: String,
)

@Serializable
data class RefreshDto(
    val refreshToken: String,
)
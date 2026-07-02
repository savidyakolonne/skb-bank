package com.skbbank.backend.common.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET =
            "my-secret-key-for-skb-bank-application-2026-secure-key";

    private static final long EXPIRATION =
            1000 * 60 * 60 * 24;

    private SecretKey getSigningKey(){
        return Keys.hmacShaKeyFor(
                SECRET.getBytes(StandardCharsets.UTF_8)
        );
    }

    // generate JWT
    public String generateToken(String email){

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getSigningKey())
                .compact();
    }

    // extract Email
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    // extract any claim
    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver
    ){
        Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);
    }

    // extract all claims
    private Claims extractAllClaims(String token){

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // check expiration
    public boolean isTokenExpired(String token){

        return extractClaim(
                token,
                Claims::getExpiration
        ).before(new Date());
    }

    // Validate JWT
    public boolean isTokenValid(
            String token,
            String email
    ) {

        final String username = extractUsername(token);

        return username.equals(email)
                && !isTokenExpired(token);
    }
}

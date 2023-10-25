package com.example.claimms.Claim;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaimService {
    @Autowired
    private ClaimRepository claimRepository;

    public Claim createClaim(Claim claim) {
        return claimRepository.save(claim);
    }

    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    public String deleteClaim(Long id) {
        if (claimRepository.findById(id).isPresent()) {
            claimRepository.deleteById(id);
            return "Claim deleted !";
        } else
            return "Error ocuured !";
    }

    public Claim updateClaim(Long id, Claim claim) {

        if (claimRepository.findById(id).isPresent()) {
            Claim c = claimRepository.findById(id).get();
            c.setSubject(claim.getSubject());
            c.setContent(claim.getContent());
            return claimRepository.save(c);
        } else
            return null;
    }

}

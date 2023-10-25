package com.example.claimms.Claim;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ClaimRestAPI {

    @Autowired
    private ClaimService claimService;

    @PostMapping(consumes = MediaType.APPLICATION_XML_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Claim> createClaim(@RequestBody Claim claim) {
        return new ResponseEntity<>(claimService.createClaim(claim), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Claim> updateClaim(@PathVariable(value = "id") Long id, @RequestBody Claim claim) {
        return new ResponseEntity<>(claimService.updateClaim(id, claim), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deleteClaim(@PathVariable(value = "id") Long id) {
        return new ResponseEntity<>(claimService.deleteClaim(id), HttpStatus.OK);
    }
}

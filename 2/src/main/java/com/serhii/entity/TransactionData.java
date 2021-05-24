package com.serhii.entity;

import java.util.Objects;

public class TransactionData {

    private String accountToWithdraw;
    private String accountToReceive;
    private double transactionAmount;

    public TransactionData() {
    }

    public TransactionData(String accountToWithdraw, String accountToReceive, double transactionAmount) {
        this.accountToWithdraw = accountToWithdraw;
        this.accountToReceive = accountToReceive;
        this.transactionAmount = transactionAmount;
    }

    public String getAccountToWithdraw() {
        return accountToWithdraw;
    }

    public void setAccountToWithdraw(String accountToWithdraw) {
        this.accountToWithdraw = accountToWithdraw;
    }

    public String getAccountToReceive() {
        return accountToReceive;
    }

    public void setAccountToReceive(String accountToReceive) {
        this.accountToReceive = accountToReceive;
    }

    public double getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(double transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TransactionData)) return false;
        TransactionData that = (TransactionData) o;
        return Double.compare(that.transactionAmount, transactionAmount) == 0 && Objects.equals(accountToWithdraw, that.accountToWithdraw) && Objects.equals(accountToReceive, that.accountToReceive);
    }

    @Override
    public int hashCode() {
        return Objects.hash(accountToWithdraw, accountToReceive, transactionAmount);
    }

    @Override
    public String toString() {
        return "TransactionData{" +
                "senderNumber='" + accountToWithdraw + '\'' +
                ", receiverNumber='" + accountToReceive + '\'' +
                ", transactionAmount=" + transactionAmount +
                '}';
    }
}
